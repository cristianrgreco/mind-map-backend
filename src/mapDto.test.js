const {validate, fromPayload} = require('./mapDto');

const aNode = {
    id: 'id-0',
    value: 'Value',
    isNew: true,
    isRoot: true,
    isSelected: true,
    x: 25,
    y: 50,
    width: 75,
    height: 100,
    parent: null,
}

describe('mapDto', () => {
    describe('#validate', () => {
        it('should return no errors if is valid', () => {
            const payload = {
                nodeList: {
                    nodes: [aNode],
                    selectedNodes: ['id-1'],
                },
                pan: {
                    x: 100,
                    y: 200,
                }
            };

            expect(validate(payload)).toBeUndefined();
        });

        it('should return error if nodes is not an array', () => {
            const payload = {
                nodeList: {
                    nodes: {},
                    selectedNodes: ['id-1'],
                },
                pan: {
                    x: 100,
                    y: 200,
                }
            };

            expect(validate(payload)).toEqual({
                'nodeList.nodes': ['Node list nodes must be of type array']
            })
        });

        it('should return error if node is invalid', () => {
            const payload = {
                nodeList: {
                    nodes: [{
                        id: 1,
                        value: 1,
                        isNew: 'true',
                        isRoot: 'true',
                        isSelected: 'true',
                        x: '25',
                        y: '50',
                        width: '75',
                        height: '100',
                        parent: 1,
                    }],
                    selectedNodes: ['id-1'],
                },
                pan: {
                    x: 100,
                    y: 200,
                }
            };

            expect(validate(payload)).toEqual({
                'nodeList.nodes': [{
                    errors: {
                        0: {
                            error: {
                                id: ['Id must be of type string'],
                                value: ['Value must be of type string'],
                                isNew: ['Is new must be of type boolean'],
                                isRoot: ['Is root must be of type boolean'],
                                isSelected: ['Is selected must be of type boolean'],
                                x: ['X must be of type number'],
                                y: ['Y must be of type number'],
                                width: ['Width must be of type number'],
                                height: ['Height must be of type number'],
                                parent: ['Parent must be of type string'],
                            }
                        }
                    }
                }]
            })
        });

        it('should return error if selected nodes is not an array', () => {
            const payload = {
                nodeList: {
                    nodes: [],
                    selectedNodes: {},
                },
                pan: {
                    x: 100,
                    y: 200,
                }
            };

            expect(validate(payload)).toEqual({
                'nodeList.selectedNodes': ['Node list selected nodes must be of type array']
            })
        });

        it('should return error if pan is invalid', () => {
            const payload = {
                nodeList: {
                    nodes: [],
                    selectedNodes: [],
                },
                pan: {
                    x: '100',
                    y: '100'
                }
            };

            expect(validate(payload)).toEqual({
                'pan.x': [`Pan x must be of type number`],
                'pan.y': [`Pan y must be of type number`]
            })
        });
    });

    describe('#fromPayload', () => {
        it('should parse a payload', () => {
            const payload = {
                nodeList: {
                    nodes: [aNode],
                    selectedNodes: ['id-1'],
                },
                pan: {
                    x: 100,
                    y: 200,
                }
            };

            const expected = {
                nodeList: {
                    nodes: [aNode],
                    selectedNodes: ['id-1'],
                },
                pan: {
                    x: 100,
                    y: 200,
                }
            };

            expect(fromPayload(payload)).toEqual(expected);
        });

        it('should strip unexpected fields', () => {
            const payload = {
                unknown: true,
                nodeList: {
                    nodes: [{...aNode, unknown: true}],
                    selectedNodes: ['id-1'],
                },
                pan: {
                    unknown: true,
                    x: 100,
                    y: 200,
                }
            };

            const expected = {
                nodeList: {
                    nodes: [aNode],
                    selectedNodes: ['id-1'],
                },
                pan: {
                    x: 100,
                    y: 200,
                }
            };

            expect(fromPayload(payload)).toEqual(expected);
        });

        it('should limit the number of nodes to 1000', () => {
            const payload = {
                nodeList: {
                    nodes: new Array(1001).map(() => aNode),
                    selectedNodes: ['id-1'],
                },
                pan: {
                    x: 100,
                    y: 200,
                }
            };

            expect(fromPayload(payload).nodeList.nodes.length).toEqual(1000);
        });

        it('should limit the number of selected nodes to 10,000', () => {
            const payload = {
                nodeList: {
                    nodes: [aNode],
                    selectedNodes: new Array(10001).map(() => 'id'),
                },
                pan: {
                    x: 100,
                    y: 200,
                }
            };

            expect(fromPayload(payload).nodeList.selectedNodes.length).toEqual(10000);
        });
    });
});
