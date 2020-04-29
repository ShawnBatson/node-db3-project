const db = require("../data/config");

function find() {
    return db("schemes");
}

function findById(id) {
    return db("schemes")
        .where("id", id)
        .then((scheme) => {
            if (scheme) {
                return scheme;
            } else {
                return null;
            }
        });
}

function findSteps(schemeId) {
    return db("steps")
        .leftJoin("schemes", "schemes.id", "steps.scheme_id")
        .where("schemes.id", schemeId)
        .select(
            // "scheme.id",
            "scheme.scheme_name",
            "steps.step_number",
            "steps.instructions"
        );
}

function add(scheme) {
    return db("schemes")
        .insert(scheme, "id")
        .then((id) => findById(id));
}

function update(changes, id) {
    return db("schemes")
        .where("id", id)
        .update(changes)
        .then((count) => (count > 0 ? get(id) : null));
}

function remove(id) {
    return db("schemes").where("id", id).del();
}

function addStep(step, scheme_id) {
    return db("steps")
        .leftJoin("schemes", "schemes.id", "steps.scheme_id")
        .where("schemes.id", scheme_id)
        .insert(step, "id")
        .then((schemeId) => findSteps(schemeId));
}

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
};
