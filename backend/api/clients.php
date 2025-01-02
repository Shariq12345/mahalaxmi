<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once('../config/database.php');

try {
    $stmt = $pdo->query("SELECT * FROM clients ORDER BY name ASC");
    $clients = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Transform image paths to full URLs
    foreach ($clients as &$client) {
        $client['logo_url'] = 'http://localhost/mahalaxmi/app/backend/uploads/clients/' . $client['logo_path'];
    }

    echo json_encode(['success' => true, 'data' => $clients]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>