import Uppie from 'uppie';

const uppie = new Uppie();

const stopPropagation = (event) => {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
};

export function droparea(element, options = {}) {
    const node = options.target || element;

    uppie(node, function(event, formData, fileNames) {
        stopPropagation(event);

        let files = [];
        for (let [_, file] of formData.entries()) {
            files.push(file);
        }

        if (files.length > 0) {
            element.dispatchEvent(new CustomEvent('files', {
                detail: {
                    files,
                    type: "files",
                    message: "larry"
                }
            }));
        }
    });

    return {
        destroy() {
        }
    };
};

export default {
    droparea
};
