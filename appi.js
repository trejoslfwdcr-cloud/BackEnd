import expres from 'express';
import EnterpriseRoutes from './src/routes/EnterpriseRoutes.js';

const app = expres();
const PORT = 3000;

app.use(express.json());
app.use('/api/v1/enterprise', EnterpriseRoutes);

app.use((req,res)=>{
    res.status(404).json({error: 'Endpoint not found'});
})

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📍 Endpoint Info: http://localhost:${PORT}/api/v1/company/info`);

});
