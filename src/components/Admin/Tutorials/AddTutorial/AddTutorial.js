import React from "react";
import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Switch,
  Spin,
  notification
} from "antd";
import { courseFormValidation } from "../../../../utils/courseFormValidation";

import CKEditor from "@ckeditor/ckeditor5-react";

// NOTE: Use the editor from source (not a build)!
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

class AddTutorial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemToModify: this.props.itemToEdit,
      isHidden: this.props.isHidden,
      triggerTutorialAction: this.props.triggerTutorialAction,
      formValidation: {
        title: "",
        content: "",
        duration_value: "",
        description: ""
      },
      formInvalid: "initial"
    };
  }
  setValidationFormOnWriting = (item, property) => {
    const { error } = courseFormValidation(item, property);
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
  handleSubmitForm = (triggerTutorialAction, itemToModify, editDeleteOrAdd) => {
    if (editDeleteOrAdd === "deleteForm") {
      triggerTutorialAction(itemToModify, editDeleteOrAdd);
    } else {
      const { itemToModify } = this.state;
      const { inputs, error } = courseFormValidation(itemToModify, "fullForm");
      if (error === false) {
        triggerTutorialAction(itemToModify, editDeleteOrAdd);
      } else {
        notification["warning"]({
          message: "Completar los campos correctamente."
        });
        this.setState(prevState => ({
          formInvalid: error,
          formValidation: {
            ...prevState.formValidation,
            title: inputs.title,
            content: inputs.content,
            description: inputs.description,
            duration_value: inputs.duration_value
          }
        }));
      }
    }
  };
  render() {
    const { Item } = Form;
    const { Option } = Select;
    const { tutorialAction, isHidden } = this.props;
    let { itemToModify, formValidation, triggerTutorialAction } = this.state;
    const { TextArea } = Input;
    return (
      <Form {...layout} name="basic">
        {tutorialAction !== "delete" ? (
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
                className={`customized-textarea ${formValidation.description}`}
                defaultValue={itemToModify.description}
                onChange={e => this.onChangeProperty(e.target.value, "description")}
                onKeyUp={e =>
                  this.setValidationFormOnWriting(e.target.value, "description")
                }
                onBlur={e =>
                  this.setValidationFormOnWriting(e.target.value, "description")
                }
              />
            </Item>
            <Item label="Contenido" className="editor__admin">
              <div className={formValidation.content}>
                <CKEditor
                  editor={ClassicEditor}
                  data={itemToModify.content}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    this.onChangeProperty(data, "content");
                    this.setValidationFormOnWriting(data, "content");
                  }}
                  onBlur={(event, editor) => {
                    const data = editor.getData();
                    this.setValidationFormOnWriting(data, "content");
                  }}
                  onFocus={(event, editor) => {
                    const data = editor.getData();
                    this.setValidationFormOnWriting(data, "content");
                  }}
                />
              </div>
            </Item>
            <Item label="Duración (Ej: 10)">
              <InputNumber
                min={1}
                max={60}
                className={formValidation.duration_value}
                defaultValue={itemToModify.duration_value}
                onChange={e => this.onChangeProperty(e, "duration_value")}
                onKeyUp={e =>
                  this.setValidationFormOnWriting(e, "duration_value")
                }
                onBlur={e =>
                  this.setValidationFormOnWriting(
                    e.target.value,
                    "duration_value"
                  )
                }
              />
            </Item>
            <Item label="Tiempo">
              <Select
                defaultValue={itemToModify.duration_text}
                placeholder="Selecciona una  opción"
                onChange={e => this.onChangeProperty(e, "duration_text")}
              >
                <Option value="minutos">Minutos</Option>
                <Option value="horas">Horas</Option>
                <Option value="dias">Días</Option>
                <Option value="semas">Semanas</Option>
              </Select>
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
              {tutorialAction === "add" ? (
                <SpinButtonAddEdit
                  isHidden={isHidden}
                  textButton="Agregar"
                  itemToModify={itemToModify}
                  editDeleteOrAdd="addForm"
                  triggerTutorialAction={triggerTutorialAction}
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
                  triggerTutorialAction={triggerTutorialAction}
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
                ¿ Está seguro que desea eliminar al curso {itemToModify.title}?
                Esta acción también implica eliminar el contenido.
              </label>
            </Item>
            <Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <SpinButtonAddEdit
                isHidden={isHidden}
                textButton="Eliminar"
                itemToModify={itemToModify}
                editDeleteOrAdd="deleteForm"
                triggerTutorialAction={triggerTutorialAction}
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
  triggerTutorialAction,
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
          handleSubmitForm(triggerTutorialAction, itemToModify, editDeleteOrAdd)
        }
      >
        {textButton}
      </Button>
    );
  }
}
export default AddTutorial;
