// AuthSignupForm.jsx
import { useState, useContext } from "react";
import { signupService } from "../../services/user";
import { Link } from "react-router-dom";
import { UserContext } from "../../contextApi/UserContext";
import {
  StyledSection,
  StyledForm,
  StyledHeading,
  StyledLabel,
  StyledInput,
  StyledButton,
} from "./AuthSignupForm.styles";

export const AuthSignupForm = () => {
  const { token, setToken } = useContext(UserContext);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    mail: "",
    password: ""
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      const userData = await signupService({
        nombre: formData.nombre,
        apellido: formData.apellido,
        direccion: formData.direccion,
        mail: formData.mail,
        password: formData.password,
      });
      console.log(userData);
      setToken(userData.detail.token);

      // Limpiar los campos después de una respuesta exitosa
      setFormData({
        nombre: "",
        apellido: "",
        direccion: "",
        mail: "",
        password: ""
      });
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      // Manejar el error aquí si es necesario
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <StyledSection>
      <StyledForm onSubmit={onSubmit}>
        <StyledHeading>Registro</StyledHeading>
        <div>
          <StyledLabel htmlFor="nombre">Nombre</StyledLabel>
          <StyledInput
            id="nombre"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <StyledLabel htmlFor="apellido">Apellido</StyledLabel>
          <StyledInput
            id="apellido"
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <StyledLabel htmlFor="direccion">Dirección</StyledLabel>
          <StyledInput
            id="direccion"
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <StyledLabel htmlFor="mail">Email</StyledLabel>
          <StyledInput
            id="mail"
            type="text"
            name="mail"
            value={formData.mail}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <StyledLabel htmlFor="password">Password</StyledLabel>
          <StyledInput
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <StyledButton type="submit">Enviar</StyledButton>
        <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
      </StyledForm>
    </StyledSection>
  );
};
