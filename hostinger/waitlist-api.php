<?php
// Buildafr Waitlist API — deploy this to Hostinger public_html/waitlist-api.php
// Data is stored in ../waitlist_data.json (one level above public_html, not web-accessible)

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Store data outside public_html for security
$DATA_FILE = dirname(__DIR__) . '/waitlist_data.json';

// Fallback: if parent directory isn't writable, store next to this file
if (!is_writable(dirname($DATA_FILE))) {
    $DATA_FILE = __DIR__ . '/waitlist_data.json';
}

$ADMIN_SECRET = 'bfr_adm_2026_K9xPmQr7wNsT';

function load_data(string $file): array {
    if (!file_exists($file)) return [];
    $raw = file_get_contents($file);
    return json_decode($raw, true) ?: [];
}

function save_data(string $file, array $data): void {
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
}

// ── POST: subscribe ──────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true) ?: [];
    $email = filter_var(trim($body['email'] ?? ''), FILTER_VALIDATE_EMAIL);

    if (!$email) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email address']);
        exit;
    }

    $data = load_data($DATA_FILE);

    foreach ($data as $entry) {
        if (strtolower($entry['email']) === strtolower($email)) {
            echo json_encode(['ok' => true, 'message' => 'already_subscribed']);
            exit;
        }
    }

    $data[] = [
        'email'      => $email,
        'role'       => substr($body['role'] ?? '', 0, 64),
        'source'     => substr($body['source'] ?? 'website', 0, 64),
        'created_at' => date('c'),
        'ip'         => $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '',
    ];

    save_data($DATA_FILE, $data);

    echo json_encode(['ok' => true, 'count' => count($data)]);
    exit;
}

// ── GET: admin list ──────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';

    if ($auth !== "Bearer $ADMIN_SECRET") {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }

    $data = load_data($DATA_FILE);

    // Sort newest first
    usort($data, fn($a, $b) => strcmp($b['created_at'], $a['created_at']));

    echo json_encode([
        'count'  => count($data),
        'emails' => $data,
    ]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
