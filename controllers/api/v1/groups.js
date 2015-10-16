var GroupModel = require('../../../models/group');
var RoleModel = require('../../../models/role');
var PermissionModel = require('../../../models/permission');

module.exports = function(router) {
    router.post('/api/v1/groups', groupCreate);
    router.get('/api/v1/groups', groupShow);
    router.get('/api/v1/groups/:groupId', groupGet);
    router.delete('/api/v1/groups/:groupId', groupDestroy);
    router.put('/api/v1/groups', groupUpdate);
};

var groupCreate = function(req, res) {
    var group = new GroupModel();
    group.data = req.body.group;
    group.created_on = new Date();
    group.modified_on = new Date();
    group.user_id = ["55c210e84c50c5080420a5f6","55c210e84c50c508042asdf6"];
    group.created_by = "Christian Ronaldo";

    var permissionLists;
    var permissionIds = [];
    var viewId;
    var editId;
    var index = 0;

    PermissionModel.find({},function(err, permissions) {
        permissionLists = permissions;

        permissionLists.forEach(function(permission) {
            permissionIds.push(permission._id);
            if (permission.name == 'view') viewId = index;
            if (permission.name == 'edit') editId = index;
            index ++;
        });

        GroupModel.find({data: req.body.group},function(err, groups) {
            if(groups.length > 0) {
                res.jsonp("repeat-group-name");
            } else {
                group.save(function(err, group) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.jsonp("success");
                    }
                });
            }
        });

    });
}

var groupShow = function(req, res) {
    GroupModel.find(function(err, groups) {
        res.send(groups);
    });
}

var groupGet = function(req, res) {
    GroupModel.find({_id : req.params.groupId },function(err, group) {
        res.send(group);
    });
}

var groupDestroy = function(req, res) {
    GroupModel.remove({_id: req.params.groupId}, function(err, group) {
        if(err) {
            console.log(err);
        } else {
            //RoleModel.remove({group_id: req.params.groupId}, function(err, role) {});
            res.send("success");
        }
    });
}

var groupUpdate = function(req, res) {
    var groupId = req.body.groupId;
    var groupName = req.body.groupName;

    GroupModel.find({_id: groupId},function(err, group) {
        group.data = groupName;
        group.modified_on = new Date();

        group.save(function(err) {
            if (err) {
                console.log(err);
            } else {
                res.jsonp("success");
            }
        });
    });
}