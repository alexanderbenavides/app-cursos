import React from "react";
import { Form, Input, Button, Select, Switch, Spin, notification } from "antd";
import { userFormValidation } from "../../../../utils/userFormValidation";
const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemToModify: this.props.itemToEdit,
      isHidden: this.props.isHidden,
      triggerUserAction: this.props.triggerUserAction,
      formValidation: {
        name: "",
        lastname: "",
        email: "",
        password: ""
      },
      formInvalid: "initial"
    };
  }
  setValidationForm = (item, property) => {
    const { error } = userFormValidation(item, property);
    this.setState(prevState => ({
      formValidation: {
        ...prevState.formValidation,
        [property]: error
      }
    }));
  };
  onChangeProperty = (item, property) => {
    this.setState(prevState => ({
      itemToModify: {
        ...prevState.itemToModify,
        [property]: item
      }
    }));
  };
  handleSubmitForm = (triggerUserAction, itemToModify, editDeleteOrAdd) => {
    if (editDeleteOrAdd === "deleteForm") {
      triggerUserAction(itemToModify, editDeleteOrAdd);
    } else {
      const { itemToModify } = this.state;
      const { inputs, error } = userFormValidation(itemToModify, "fullForm");
      if (error === false) {
        triggerUserAction(itemToModify, editDeleteOrAdd);
      } else {
        notification["warning"]({
          message: "Completar los campos correctamente."
        });
        this.setState(prevState => ({
          formInvalid: error,
          formValidation: {
            ...prevState.formValidation,
            name: inputs.name,
            lastname: inputs.lastname,
            email: inputs.email,
            password: inputs.password
          }
        }));
      }
    }
  };
  render() {
    const { Item } = Form;
    const { Option } = Select;
    const { userAction, isHidden } = this.props;
    let { itemToModify, formValidation, triggerUserAction } = this.state;
    return (
      <Form {...layout} name="basic">
        {userAction !== "delete" ? (
          <div>
            <Item label="Nombres" name="name">
              <div>
                <Input
                  className={formValidation.name}
                  defaultValue={itemToModify.name}
                  onChange={e => this.onChangeProperty(e.target.value, "name")}
                  onKeyUp={e => this.setValidationForm(e.target.value, "name")}
                  onBlur={e => this.setValidationForm(e.target.value, "name")}
                />
              </div>
            </Item>
            <Item label="Apellidos" name="lastname">
              <div>
                <Input
                  className={formValidation.lastname}
                  defaultValue={itemToModify.lastname}
                  onChange={e =>
                    this.onChangeProperty(e.target.value, "lastname")
                  }
                  onKeyUp={e =>
                    this.setValidationForm(e.target.value, "lastname")
                  }
                  onBlur={e =>
                    this.setValidationForm(e.target.value, "lastname")
                  }
                />
              </div>
            </Item>
            <Item label="Email" name="email">
              <div>
                <Input
                  className={formValidation.email}
                  defaultValue={itemToModify.email}
                  onChange={e => this.onChangeProperty(e.target.value, "email")}
                  onKeyUp={e => this.setValidationForm(e.target.value, "email")}
                  onBlur={e => this.setValidationForm(e.target.value, "email")}
                />
              </div>
            </Item>
            <Item label="Contraseña" name="password">
              <Input.Password
                className={formValidation.password}
                defaultValue={itemToModify.password}
                onChange={e =>
                  this.onChangeProperty(e.target.value, "password")
                }
                onKeyUp={e =>
                  this.setValidationForm(e.target.value, "password")
                }
                onBlur={e => this.setValidationForm(e.target.value, "password")}
              />
            </Item>
            <Item label="Rol">
              <Select
                defaultValue={itemToModify.role}
                placeholder="Selecciona un rol"
                onChange={e => this.onChangeProperty(e, "role")}
              >
                <Option value="admin">Administrador</Option>
                <Option value="editor">Gestor de contenido</Option>
                <Option value="reviwer">Revisor</Option>
              </Select>
            </Item>
            <Item label="Estado">
              <Switch
                defaultValue={itemToModify}
                checkedChildren="Activo"
                unCheckedChildren="Innactivo"
                checked={itemToModify.active}
                onClick={e => this.onChangeProperty(e, "active")}
              />
            </Item>
            <Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              {userAction === "add" ? (
                <SpinButtonAddEdit
                  isHidden={isHidden}
                  textButton="Agregar"
                  itemToModify={itemToModify}
                  editDeleteOrAdd="addForm"
                  triggerUserAction={triggerUserAction}
                  buttonType="primary"
                  isDanger={false}
                  handleSubmitForm={this.handleSubmitForm}
                ></SpinButtonAddEdit>
              ) : (
                <SpinButtonAddEdit
                  isHidden={isHidden}
                  textButton="Guardar"
                  itemToModify={itemToModify}
                  editDeleteOrAdd="editForm"
                  triggerUserAction={triggerUserAction}
                  buttonType="primary"
                  isDanger={false}
                  handleSubmitForm={this.handleSubmitForm}
                ></SpinButtonAddEdit>
              )}
            </Item>
          </div>
        ) : (
          <div>
            <Item className="warning__message">
              <label>
                ¿ Está seguro que desea eliminar al usuario {itemToModify.name}{" "}
                {itemToModify.lastname}? Esta acción no puede ser revertida.
              </label>
            </Item>
            <Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <SpinButtonAddEdit
                isHidden={isHidden}
                textButton="Eliminar"
                itemToModify={itemToModify}
                editDeleteOrAdd="deleteForm"
                triggerUserAction={triggerUserAction}
                buttonType="primary"
                isDanger={true}
                handleSubmitForm={this.handleSubmitForm}
              ></SpinButtonAddEdit>
            </Item>
          </div>
        )}
      </Form>
    );
  }
}

function SpinButtonAddEdit({
  isHidden,
  textButton,
  itemToModify,
  editDeleteOrAdd,
  triggerUserAction,
  buttonType,
  isDanger,
  handleSubmitForm
}) {
  if (isHidden) {
    return <Spin></Spin>;
  } else {
    return (
      <Button
        danger={isDanger}
        type={buttonType}
        onClick={() =>
          handleSubmitForm(triggerUserAction, itemToModify, editDeleteOrAdd)
        }
      >
        {textButton}
      </Button>
    );
  }
}
export default AddUser;
