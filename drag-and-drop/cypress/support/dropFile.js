function dropFile(subject, fixture, newName) {

    // Get the fixture...
    Cypress.cy.fixture(fixture).then(fileContent => {
        // At this point, we could convert the content based on the encoding, such as:
        //      [ENCODING.ASCII]: fileContent => Cypress.Promise.resolve(fileContent),
        //      [ENCODING.BASE64]: (fileContent, mimeType) => Cypress.Blob.base64StringToBlob(fileContent, mimeType),
        //      [ENCODING.BINARY]: (fileContent, mimeType) => Cypress.Blob.binaryStringToBlob(fileContent, mimeType),
        // For now, only deal with the ones that come over correctly...

        // Can I skip the mimeType?
        //      const file = new File([blob], fileName, { type: mimeType });
        const file = new File([fileContent], newName || fixture);

        let dataTransfer = new DataTransfer();
        let dataTransferItem = dataTransfer.items.add(file);

        // // https://github.com/silverwind/uppie/pull/11
        // // This overrides ALL - its a static member
        // dataTransferItem.__proto__.webkitGetAsEntry = () => {
        //     return {
        //         isFile: true,
        //         file: successCallback => successCallback(dataTransferItem.getAsFile()),
        //     };
        // };

        const eventPayload = {
          bubbles: true,
          cancelable: true,
          detail: dataTransfer,
        };

        const events = ['dragstart', 'drag', 'dragenter', 'drop', 'change', 'dragleave', 'dragend']
        events.forEach(e => {
          const event = new CustomEvent(e, eventPayload);
          Object.assign(event, { dataTransfer });
          subject[0].dispatchEvent(event);
        });
    })
}

Cypress.Commands.add('dropFile', { prevSubject: true }, dropFile);
