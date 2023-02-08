const yup = require("yup");
const formSchema = yup.object({
  username: yup.string().required().min(5).max(15),
  password: yup.string().required().min(6).max(28),
});

const validateForm = (req, res) => {
  const formData = req.body;
  return formSchema
    .validate(formData)
    .catch((err) => {
      let error = new Error("ValidationError");
      error.error = err.errors[0];
      throw error;
    })
    .then((valid) => {
      console.log("vaid", valid);
    });
};

module.exports = validateForm;
