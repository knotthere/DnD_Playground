/// <reference types="Cypress" />

describe('Drag and Drop', function() {

    beforeEach(function() {
        cy.visit('/')
        cy.contains('Drop Here')
    })

    const target = 'div .drophere'
    const fileName = 'example.txt'
    const fixtures = Cypress.config('fixturesFolder');
    const subDir = 'Subdirectory'
    const subDirFile = 'Nested_example.png'

    // Single File DnD
    it('TXT onto Page', function() {
        cy.get(target)
            .attachFile(fileName, { subjectType: 'drag-n-drop' })
        cy.contains(fileName)
    })

    it('List Sub Directory Contents', function() {
        cy.exec(`find ${fixtures}/${subDir}`)
            .then((dir) => {
                // "this" is still the test context object
                const files = dir.stdout.split('\n')
                files.forEach(console.log)
            })
    })

    it('Sub Directory', function() {
        cy.get(target)
            .attachDirectory(subDir, { subjectType: 'drag-n-drop', allowEmpty: true })
        cy.contains(subDirFile)

    })
});
