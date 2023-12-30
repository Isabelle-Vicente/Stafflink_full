import express from 'express';
import { DB } from '../models/Database.js'; 
import multer from 'multer';
import 'dotenv/config';

const router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { originalname, buffer } = req.file;

    let completeNews = {
      ...req.body,
      bannerFileName: `${Date.now()}-${originalname}`,
      bannerFile: buffer
    }


    await DB.createNews(completeNews);

    res.status(201).json({ message: `Notícia criado com sucesso!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao carregar a imagem ou criar a Notícia' });
  }
});

router.get('/bannerFile/:bannerFileName', async (req, res) => {
  try {
    
    const bannerFileName = req.params.bannerFileName
    // const bannerFileNameArray = bannerFileName.split('.');
    // const bannerFileExt = bannerFileNameArray[bannerFileNameArray.length-1]
    const photo = await DB.getbannerFile(bannerFileName)
  
    res.setHeader('Content-Type','image/jpeg')

    res.end(photo);
  } catch (error) {
    res.status(404).send({message: 'Erro ao exibir a imagem', error});
  }
})

router.get('/', async (req, res) => {
  const news = await DB.listNews();

  res.status(200).json(news);
});

router.get('/:id', async (req, res) => {
  const news = await DB.getNews(req.params.id);

  res.status(200).json(news)
})

router.put('/:id', async (req, res) => {
  const newsId = req.params.id;
  const newData = req.body;

  await DB.updateNews(newsId, newData);

  res.status(204).json({ message: 'Notícia atualizado com sucesso' });
});

router.delete('/:id', async (req, res) => {
  const newsId = req.params.id;
  
  await DB.deleteNews(newsId);

  res.status(201).json({ message: 'Notícia removida com sucesso' });
})


export default router;
