const validateJs = require('validate.js');

validateJs.validators.node = (nodes, nodeConstraints) => {
    if (!Array.isArray(nodes)) {
        return null;
    }

    const nodeErrors = nodes.reduce((errors, node, index) => {
        const error = validateJs(node, nodeConstraints)
        if (error) {
            errors[index] = {error}
        }
        return errors
    }, {});

    return Object.keys(nodeErrors).length === 0 ? null : {errors: nodeErrors};
};

const validationConstraints = {
    'nodeList.nodes': {
        presence: true,
        type: "array",
        node: {
            id: {
                presence: true,
                type: "string"
            },
            value: {
                presence: true,
                type: "string"
            },
            isNew: {
                presence: true,
                type: "boolean"
            },
            isRoot: {
                presence: true,
                type: "boolean"
            },
            isSelected: {
                presence: true,
                type: "boolean"
            },
            x: {
                presence: true,
                type: "number"
            },
            y: {
                presence: true,
                type: "number"
            },
            width: {
                presence: true,
                type: "number"
            },
            height: {
                presence: true,
                type: "number"
            },
            parent: {
                type: "string"
            },
        }
    },
    'nodeList.selectedNodes': {
        presence: true,
        type: "array"
    },
    'pan.x': {
        presence: true,
        type: "number"
    },
    'pan.y': {
        presence: true,
        type: "number"
    }
};

const validate = payload => validateJs(payload, validationConstraints);

const fromPayload = payload => ({
    nodeList: {
        nodes: payload.nodeList.nodes.slice(0, 1000).map(node => ({
            id: node.id,
            value: node.value,
            isNew: node.isNew,
            isRoot: node.isRoot,
            isSelected: node.isSelected,
            x: node.x,
            y: node.y,
            width: node.width,
            height: node.height,
            parent: node.parent,
        })),
        selectedNodes: payload.nodeList.selectedNodes.slice(0, 10000),
    },
    pan: {
        x: payload.pan.x,
        y: payload.pan.y,
    }
});

module.exports = {
    validate,
    fromPayload
};
