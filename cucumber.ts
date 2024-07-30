const common = `
    --require features/support/hooks.ts
    --require features/step_definitions/**/*.steps.ts
    `
module.exports = {
    default: `${common} features/**/*.feature`,
}