const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack");
const randomWords = require("random-words");

db.authenticate().then(() => {
  console.log("Connected to wikistack database");
})

function generateSlug(str) {
  if (!str) {
    let result = randomWords();
  } else {
    const result = str.replace(/\s+/g, "_").replace(/\W/g, '');
  }
    return result;
}

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
});

Page.beforeValidate(function(pageInstance) {
  pageInstance.slug = generateSlug(pageInstance.slug);
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

module.exports = {Page, User, db};
