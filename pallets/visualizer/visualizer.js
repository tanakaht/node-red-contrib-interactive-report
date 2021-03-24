module.exports = function(RED) {
    'use strict';
    function nodeGo(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        node.visconfig = config.visconfig;
        if (this.context().flow.get("visnodeid") != null) {
            // some warning
        }
        this.context().flow.set("visnodeid", node.id);
        node.on('input', function (msg) {
            node.context().set("data", msg.payload);
            msg.payload = { visnodeid: node.id, data: node.context().get("data") };
            node.send(msg);
        });
    }
    RED.nodes.registerType("visualizer", nodeGo);

    /**
     * Provide Api point to get build js code for ui
     * **/
    RED.httpAdmin.get(`/visualizer/js/*`, (req, res) => {
        res.sendFile(req.params[0], {
            root: __dirname + '/ui/build', // <- get code form this dir
            dotfiles: 'deny'
        });
    });

    RED.httpAdmin.get("/visualizer/data/:id", function(req,res) {
        var addminNode = RED.nodes.getNode(req.params.id);
        if (addminNode != null && addminNode.type != 'visualizer') {
            addminNode = RED.nodes.getNode(addminNode.context().flow.get("visnodeid"));
        }
        if (addminNode != null) {
            try {
                const data = { ...{ data: addminNode.context().get("data") }, ...JSON.parse(addminNode.visconfig) };
                res.json({
                    visType: data.visType,
                    data: data,
                    node: addminNode
                });
            } catch(err) {
                res.sendStatus(500);
            }
        } else {
                res.sendStatus(404);
        }
    });
};
