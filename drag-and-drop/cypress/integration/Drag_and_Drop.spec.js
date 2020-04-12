/// <reference types="Cypress" />

describe('Drag and Drop', function() {

    const target = 'div .drophere'
    const fileName = 'example.txt'
    const fixtures = Cypress.config('fixturesFolder');
    const subDir = 'Subdirectory'
    const subDirFile = 'Nested_example.png'

    beforeEach(function() {
        cy.visit('/')
            .get(target)
            .contains('Drop Here')
    })

    // // Single File DnD
    // it('TXT onto Page', function() {
    //     cy.attachFile(fileName, { subjectType: 'drag-n-drop' })
    //     cy.contains(fileName)
    // })

    it('List Sub Directory Contents', function() {
        cy.exec(`find ${fixtures}/${subDir}`)
            .then((dir) => {
                // "this" is still the test context object
                const files = dir.stdout.split('\n')
                files.forEach(console.log)
            })
    })

    // Test new attachDirectory command - that attaches all children files...
    it('Sub Directory', function() {
        cy.get(target)
            .attachDirectory(subDir, { subjectType: 'drag-n-drop', allowEmpty: true })
            .contains(subDirFile)
    })

    // Test my replacement for 'cypress-file-upload' - dropFile()
    // As that package has exploded in v4.
    it.only('Test new dropFile()', function() {
        cy.get(target)
            .dropFile(fileName)
        cy.contains(fileName)
    })
});
