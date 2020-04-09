/// <reference types="Cypress" />

describe('Drag and Drop', function() {

    beforeEach(function() {
        cy.visit('/')
        cy.contains('Drop Here')
    })

    const target = 'div .drophere'
    const fileName = 'example.txt'
    const fixtures = Cypress.config('fixturesFolder');

    // Single File DnD
    it('TXT onto Page', function() {
        cy.get(target)
            .attachFile(fileName, { subjectType: 'drag-n-drop' })
        cy.contains(fileName)
    })

    // Fails - needs files...ß
    it.skip('Read Directory', function() {
        cy.fixture('Set1')
            .then(($Set1) => {
                // "this" is still the test context object
                this.Set1 = $Set1
            })
    })

    it('List Directory Contents', function() {
        cy.exec(`find ${fixtures}/Set1`)
            .then((set1) => {
                // "this" is still the test context object
                const files = set1.stdout.split('\n')
                // files.forEach(console.log)
            })
    })

    it('Directory', function() {
        const dirName = 'Set1'
        cy.get(target)
            .attachDirectory('Set1', { subjectType: 'drag-n-drop', allowEmpty: true })
        cy.contains('Nested_Folder1_2')

    })
});
