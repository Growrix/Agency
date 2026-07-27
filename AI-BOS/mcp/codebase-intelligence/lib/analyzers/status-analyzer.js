export function analyzeImplementationStatus(modules) {
    const report = {
        built: [],
        partial: [],
        scaffolded: [],
        missing: [],
        unknown: [],
        reuseCandidates: [],
        gaps: [],
    };
    for (const mod of modules) {
        switch (mod.status) {
            case 'built':
                report.built.push(mod.path);
                if (mod.exports.length > 0) {
                    report.reuseCandidates.push(mod.path);
                }
                break;
            case 'partial':
                report.partial.push(mod.path);
                report.gaps.push(`${mod.path} (partial implementation)`);
                break;
            case 'scaffolded':
                report.scaffolded.push(mod.path);
                report.gaps.push(`${mod.path} (scaffolded only)`);
                break;
            case 'missing':
                report.missing.push(mod.path);
                report.gaps.push(`${mod.path} (missing)`);
                break;
            default:
                report.unknown.push(mod.path);
                break;
        }
    }
    return report;
}
//# sourceMappingURL=status-analyzer.js.map