export function analyzeRisks(modules) {
    const risks = [];
    const invalidationHints = [];
    // Detect untested built modules
    const untestedBuilt = modules.filter(m => m.status === 'built' && !m.tested);
    if (untestedBuilt.length > 0) {
        risks.push(`${untestedBuilt.length} built module(s) without test coverage: ${untestedBuilt.map(m => m.path).slice(0, 5).join(', ')}${untestedBuilt.length > 5 ? '...' : ''}`);
    }
    // Detect modules with many dependencies (coupling risk)
    const highDep = modules.filter(m => m.dependencies.length > 10);
    for (const mod of highDep) {
        risks.push(`${mod.path} has ${mod.dependencies.length} dependencies (high coupling)`);
    }
    // Detect orphan modules (nothing uses them, not entry points)
    const orphans = modules.filter(m => m.usedBy.length === 0 &&
        m.type !== 'mcp' &&
        m.status === 'built' &&
        !m.path.includes('index.') &&
        !m.path.includes('cli'));
    if (orphans.length > 0) {
        invalidationHints.push(`${orphans.length} potentially orphaned module(s): ${orphans.map(m => m.path).slice(0, 5).join(', ')}${orphans.length > 5 ? '...' : ''}`);
    }
    // Detect scaffolded modules that block integration
    const scaffoldedWithConsumers = modules.filter(m => m.status === 'scaffolded' && m.usedBy.length > 0);
    for (const mod of scaffoldedWithConsumers) {
        risks.push(`${mod.path} is scaffolded but used by ${mod.usedBy.length} module(s)`);
    }
    return { risks, invalidationHints };
}
//# sourceMappingURL=risk-analyzer.js.map