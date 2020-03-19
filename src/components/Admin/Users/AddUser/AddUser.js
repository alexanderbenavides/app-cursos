import React from "react";
import { Form, Input, Button, Select, Switch, Spin } from "antd";
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
      isHidden: this.props.isHidden
    };
  }
  onChangeProperty = (item, property) => {
    this.setState(prevState => ({
      itemToModify: {
        ...prevState.itemToModify,
        [property]: item
      }
    }));
  };
  render() {
    const { Item } = Form;
    const { Option } = Select;
    const { userAction, isHidden, triggerUserAction } = this.props;
    let { itemToModify } = this.state;
    return (
      <Form {...layout} name="basic">
        {userAction !== "delete" ? (
          <div>
            <Item label="Nombres" name="name">
              <div>
                <Input
                  defaultValue={itemToModify.name}
                  onChange={e => this.onChangeProperty(e.target.value, "name")}
                />
              </div>
            </Item>
            <Item label="Apellidos" name="lastname">
              <div>
                <Input
                  defaultValue={itemToModify.lastname}
                  onChange={e =>
                    this.onChangeProperty(e.target.value, "lastname")
                  }
                />
              </div>
            </Item>
            <Item label="Email" name="email">
              <div>
                <Input
                  defaultValue={itemToModify.email}
                  onChange={e => this.onChangeProperty(e.target.value, "email")}
                />
              </div>
            </Item>
            <Item label="Contraseña" name="password">
              <Input.Password
                defaultValue={itemToModify.password}
                onChange={e =>
                  this.onChangeProperty(e.target.value, "password")
                }
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
  isDanger
}) {
  if (isHidden) {
    return <Spin></Spin>;
  } else {
    return (
      <Button
        danger={isDanger}
        type={buttonType}
        onClick={() => triggerUserAction(itemToModify, editDeleteOrAdd)}
      >
        {textButton}
      </Button>
    );
  }
}
export default AddUser;
