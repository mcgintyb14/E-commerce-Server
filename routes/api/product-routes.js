const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// GET all products
router.get('/', async (req, res) => {
  try {
    const productsData = await Product.findAll({
      include: [
        { model: Category },
        { model: Tag, through: ProductTag }
      ]
    });
    res.json(productsData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET one product by id
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [
        { model: Category },
        { model: Tag, through: ProductTag }
      ]
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }

    res.json(productData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST a new product
router.post('/', async (req, res) => {
  try {
    const productData = await Product.create(req.body);

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: productData.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(201).json(productData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// PUT update a product by id
router.put('/:id', async (req, res) => {
  try {
    const productData = await Product.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!productData[0]) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }

    // Update ProductTag associations if tagIds provided
    if (req.body.tagIds && req.body.tagIds.length) {
      const existingProductTags = await ProductTag.findAll({
        where: { product_id: req.params.id }
      });
      const existingTagIds = existingProductTags.map(({ tag_id }) => tag_id);
      const newTagIds = req.body.tagIds.filter((tag_id) => !existingTagIds.includes(tag_id));
      const deletedTagIds = existingTagIds.filter((tag_id) => !req.body.tagIds.includes(tag_id));

      await ProductTag.destroy({ where: { product_id: req.params.id, tag_id: deletedTagIds } });

      const productTagIdArr = newTagIds.map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id,
        };
      });

      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.json(productData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE a product by id
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }

    res.json(productData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
