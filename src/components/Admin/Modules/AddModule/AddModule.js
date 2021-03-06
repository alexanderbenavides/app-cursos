import React from "react";
import { Form, Input, Button, Switch, Spin, notification } from "antd";
import { moduleFormValidation } from "../../../../utils/moduleFormValidation";
const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

class AddModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemToModify: this.props.itemToEdit,
      isHidden: this.props.isHidden,
      triggerModuleAction: this.props.triggerModuleAction,
      formValidation: {
        title: "",
        content: ""
      },
      formInvalid: "initial"
    };
  }
  setValidationFormOnWriting = (item, property) => {
    const { error } = moduleFormValidation(item, property);
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
  handleSubmitForm = (triggerModuleAction, itemToModify, editDeleteOrAdd) => {
    if (editDeleteOrAdd === "deleteForm") {
      triggerModuleAction(itemToModify, editDeleteOrAdd);
    } else {
      const { itemToModify } = this.state;
      const { inputs, error } = moduleFormValidation(itemToModify, "fullForm");
      if (error === false) {
        triggerModuleAction(itemToModify, editDeleteOrAdd);
      } else {
        notification["warning"]({
          message: "Completar los campos correctamente."
        });
        this.setState(prevState => ({
          formInvalid: error,
          formValidation: {
            ...prevState.formValidation,
            title: inputs.title,
            content: inputs.content
          }
        }));
      }
    }
  };
  render() {
    const { Item } = Form;
    const { moduleAction, isHidden } = this.props;
    let { itemToModify, formValidation, triggerModuleAction } = this.state;
    const { TextArea } = Input;
    return (
      <Form {...layout} name="basic">
        {moduleAction !== "delete" ? (
          <div>
            <Item label="Título" name="title">
              <div>
                <Input
                  className={formValidation.title}
                  defaultValue={itemToModify.title}
                  onChange={e => this.onChangeProperty(e.target.value, "title")}
                  onKeyUp={e =>
                    this.setValidationFormOnWriting(e.target.value, "title")
                  }
                  onBlur={e =>
                    this.setValidationFormOnWriting(e.target.value, "title")
                  }
                />
              </div>
            </Item>
            <Item label="Descripción">
              <TextArea
                rows="5"
                className={`customized-textarea ${formValidation.content}`}
                defaultValue={itemToModify.content}
                onChange={e => this.onChangeProperty(e.target.value, "content")}
                onKeyUp={e =>
                  this.setValidationFormOnWriting(e.target.value, "content")
                }
                onBlur={e =>
                  this.setValidationFormOnWriting(e.target.value, "content")
                }
              />
            </Item>
            <Item label="Curso">
              <div>
                <Input defaultValue={itemToModify.courseTitle} disabled />
              </div>
            </Item>
            <Item label="Publicado">
              <Switch
                defaultValue={itemToModify}
                checkedChildren="Publicado"
                unCheckedChildren="Suspendido"
                checked={itemToModify.published}
                onClick={e => this.onChangeProperty(e, "published")}
              />
            </Item>
            <Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              {moduleAction === "add" ? (
                <SpinButtonAddEdit
                  isHidden={isHidden}
                  textButton="Agregar"
                  itemToModify={itemToModify}
                  editDeleteOrAdd="addForm"
                  triggerModuleAction={triggerModuleAction}
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
                  triggerModuleAction={triggerModuleAction}
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
                ¿ Está seguro que desea eliminar al módulo {itemToModify.title}?
                Esta acción también implica eliminar el contenido de los temas.
              </label>
            </Item>
            <Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <SpinButtonAddEdit
                isHidden={isHidden}
                textButton="Eliminar"
                itemToModify={itemToModify}
                editDeleteOrAdd="deleteForm"
                triggerModuleAction={triggerModuleAction}
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
  triggerModuleAction,
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
          handleSubmitForm(triggerModuleAction, itemToModify, editDeleteOrAdd)
        }
      >
        {textButton}
      </Button>
    );
  }
}
export default AddModule;
