import fs from 'fs';
import path from 'path';
export const SNAPSHOT_FILENAME = 'latest-snapshot.json';
export const SUMMARY_FILENAME = 'latest-summary.json';
export const STATE_FILENAME = 'state.json';
function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}
export function writeSnapshot(snapshotDir, snapshot) {
    ensureDir(snapshotDir);
    const filePath = path.join(snapshotDir, SNAPSHOT_FILENAME);
    fs.writeFileSync(filePath, JSON.stringify(snapshot, null, 2), 'utf-8');
    console.log(`Snapshot written to ${filePath}`);
}
export function readSnapshot(snapshotDir) {
    const filePath = path.join(snapshotDir, SNAPSHOT_FILENAME);
    if (!fs.existsSync(filePath))
        return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}
export function writeSummary(snapshotDir, summary) {
    ensureDir(snapshotDir);
    const filePath = path.join(snapshotDir, SUMMARY_FILENAME);
    fs.writeFileSync(filePath, JSON.stringify(summary, null, 2), 'utf-8');
    console.log(`Summary written to ${filePath}`);
}
export function readSummary(snapshotDir) {
    const filePath = path.join(snapshotDir, SUMMARY_FILENAME);
    if (!fs.existsSync(filePath))
        return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}
export function writeState(snapshotDir, state) {
    ensureDir(snapshotDir);
    const filePath = path.join(snapshotDir, STATE_FILENAME);
    fs.writeFileSync(filePath, JSON.stringify(state, null, 2), 'utf-8');
    console.log(`State written to ${filePath}`);
}
export function readState(snapshotDir) {
    const filePath = path.join(snapshotDir, STATE_FILENAME);
    if (!fs.existsSync(filePath))
        return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}
export function snapshotExists(snapshotDir) {
    return fs.existsSync(path.join(snapshotDir, SNAPSHOT_FILENAME));
}
export function clearSnapshotDir(snapshotDir) {
    for (const filename of [SNAPSHOT_FILENAME, SUMMARY_FILENAME, STATE_FILENAME]) {
        const filePath = path.join(snapshotDir, filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
}
//# sourceMappingURL=storage.js.map