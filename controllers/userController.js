const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { nom, login, motdepasse, role } = req.body;

    const userExist = await User.findOne({ login });
    if (userExist) {
      return res.status(400).json({ message: "Utilisateur déjà existant" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(motdepasse, salt);

    const user = await User.create({
      nom,
      login,
      motdepasse: hashedPassword,
      role,
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: { id: user._id, nom: user.nom, login: user.login, role: user.role },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { login, motdepasse } = req.body;

    const user = await User.findOne({ login });
    if (!user) {
      return res.status(400).json({ message: "Login ou mot de passe incorrect" });
    }

    const isMatch = await bcrypt.compare(motdepasse, user.motdepasse);
    if (!isMatch) {
      return res.status(400).json({ message: "Login ou mot de passe incorrect" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Connexion réussie",
      user: { id: user._id, nom: user.nom, login: user.login, role: user.role },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
