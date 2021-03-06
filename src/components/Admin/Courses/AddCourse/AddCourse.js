import React from "react";

import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Switch,
  Spin,
  notification,
} from "antd";
import { courseFormValidation } from "../../../../utils/courseFormValidation";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

class AddCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      itemToModify: this.props.itemToEdit,
      isHidden: this.props.isHidden,
      triggerCourseAction: this.props.triggerCourseAction,
      formValidation: {
        title: "",
        content: "",
        duration_value: "",
      },
      formInvalid: "initial",
    };
  }

  setValidationFormOnWriting = (item, property) => {
    const { error } = courseFormValidation(item, property);
    this.setState((prevState) => ({
      formValidation: {
        ...prevState.formValidation,
        [property]: error,
      },
    }));
  };
  onChangeProperty = (item, property) => {
    this.setState((prevState) => ({
      itemToModify: {
        ...prevState.itemToModify,
        [property]: item,
      },
    }));
  };
  handleSubmitForm = (triggerCourseAction, itemToModify, editDeleteOrAdd) => {
    if (editDeleteOrAdd === "deleteForm") {
      triggerCourseAction(itemToModify, editDeleteOrAdd);
    } else {
      const { itemToModify } = this.state;
      const { inputs, error } = courseFormValidation(itemToModify, "fullForm");
      if (error === false) {
        triggerCourseAction(itemToModify, editDeleteOrAdd);
      } else {
        notification["warning"]({
          message: "Completar los campos correctamente.",
        });
        this.setState((prevState) => ({
          formInvalid: error,
          formValidation: {
            ...prevState.formValidation,
            title: inputs.title,
            content: inputs.content,
            duration_value: inputs.duration_value,
          },
        }));
      }
    }
  };

  render() {
    const { Item } = Form;
    const { Option } = Select;
    const { courseAction, isHidden } = this.props;
    let { itemToModify, formValidation, triggerCourseAction } = this.state;
    const { TextArea } = Input;
    return (
      <Form {...layout} name="basic">
        {courseAction !== "delete" ? (
          <div>
            <Item label="Título" name="title">
              <div>
                <Input
                  className={formValidation.title}
                  defaultValue={itemToModify.title}
                  onChange={(e) =>
                    this.onChangeProperty(e.target.value, "title")
                  }
                  onKeyUp={(e) =>
                    this.setValidationFormOnWriting(e.target.value, "title")
                  }
                  onBlur={(e) =>
                    this.setValidationFormOnWriting(e.target.value, "title")
                  }
                />
              </div>
            </Item>
            <Item label="Descripción">
              <TextArea
                rows="5"
                // className={formValidation.content}
                className={`customized-textarea ${formValidation.content}`}
                defaultValue={itemToModify.content}
                onChange={(e) =>
                  this.onChangeProperty(e.target.value, "content")
                }
                onKeyUp={(e) =>
                  this.setValidationFormOnWriting(e.target.value, "content")
                }
                onBlur={(e) =>
                  this.setValidationFormOnWriting(e.target.value, "content")
                }
              />
            </Item>
            <Item label="Duración (Ej: 10)">
              <InputNumber
                min={1}
                max={60}
                className={formValidation.duration_value}
                defaultValue={itemToModify.duration_value}
                onChange={(e) => this.onChangeProperty(e, "duration_value")}
                onKeyUp={(e) =>
                  this.setValidationFormOnWriting(e, "duration_value")
                }
                onBlur={(e) =>
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
                onChange={(e) => this.onChangeProperty(e, "duration_text")}
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
                onClick={(e) => this.onChangeProperty(e, "published")}
              />
            </Item>
            <Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              {courseAction === "add" ? (
                <SpinButtonAddEdit
                  isHidden={isHidden}
                  textButton="Agregar"
                  itemToModify={itemToModify}
                  editDeleteOrAdd="addForm"
                  triggerCourseAction={triggerCourseAction}
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
                  triggerCourseAction={triggerCourseAction}
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
                triggerCourseAction={triggerCourseAction}
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
  triggerCourseAction,
  buttonType,
  isDanger,
  handleSubmitForm,
}) {
  if (isHidden) {
    return <Spin></Spin>;
  } else {
    return (
      <Button
        danger={isDanger}
        type={buttonType}
        onClick={() =>
          handleSubmitForm(triggerCourseAction, itemToModify, editDeleteOrAdd)
        }
      >
        {textButton}
      </Button>
    );
  }
}
export default AddCourse;
