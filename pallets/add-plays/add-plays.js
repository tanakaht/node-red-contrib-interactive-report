module.exports = function(RED) {
    'use strict';
    function nodeGo(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        node.plays = config.plays;
        node.on('input', function (msg) {
            msg.payload.plays = msg.payload.plays || [];
            node.context().set("prePlays", msg.payload.plays);
            msg.payload.plays = [...msg.payload.plays, node.plays];
            node.send(msg);
        });
    }
    RED.nodes.registerType("add-plays", nodeGo);

    RED.httpAdmin.get("/plays/pre-plays/:id", function (req, res) {
        var addminNode = RED.nodes.getNode(req.params.id);
        if (addminNode != null) {
            try {
                res.json(addminNode.context().get("prePlays"));
            } catch(err) {
                res.sendStatus(500);
            }
        } else {
                res.sendStatus(404);
        }
    });
};
