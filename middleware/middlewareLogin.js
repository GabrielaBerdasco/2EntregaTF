export const login = (req, res, next) => {
    const admin = true
    if(admin){
        next()
    } else {
        res.json({ error: 'Usuario no autorizado' })
    }
}