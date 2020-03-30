const connection = require('../database/conection.js');
module.exports = {
    async index(req, res) {
        /*paginação*/
        const { page = 1 } = req.query;
        const [count] = await connection('incidents').count();
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
        res.header('X-Total-Count', count['count(*)']);
        return res.json(incidents);
    },
    async create(req, res) {
        const { titulo, description, value } = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await connection('incidents').insert({
            titulo,
            description,
            value,
            ong_id
        });
        return res.json({ id });

    },
    async delete(req, res) {
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incidents = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        if (incidents.ong_id != ong_id) {
            return res.status(401).json({ error: 'Operation not permited' });
        }
        await connection('incidents').where('id', id).delete();

        return res.status(204).send();
    }
}