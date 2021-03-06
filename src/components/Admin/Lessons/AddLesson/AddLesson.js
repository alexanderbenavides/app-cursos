import React from "react";
import { Form, Input, Button, Switch, Spin, notification } from "antd";
import { moduleFormValidation } from "../../../../utils/moduleFormValidation";

import { Editor } from "@tinymce/tinymce-react";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

class AddLesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemToModify: this.props.itemToEdit,
      isHidden: this.props.isHidden,
      triggerLessonAction: this.props.triggerLessonAction,
      formValidation: {
        title: "",
        content: "",
      },
      formInvalid: "initial",
    };
  }
  setValidationFormOnWriting = (item, property) => {
    const { error } = moduleFormValidation(item, property);
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
  handleSubmitForm = (triggerLessonAction, itemToModify, editDeleteOrAdd) => {
    if (editDeleteOrAdd === "deleteForm") {
      triggerLessonAction(itemToModify, editDeleteOrAdd);
    } else {
      const { itemToModify } = this.state;
      const { inputs, error } = moduleFormValidation(itemToModify, "fullForm");
      if (error === false) {
        triggerLessonAction(itemToModify, editDeleteOrAdd);
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
          },
        }));
      }
    }
  };
  render() {
    const { Item } = Form;
    const { moduleAction, isHidden } = this.props;
    let { itemToModify, formValidation, triggerLessonAction } = this.state;
    return (
      <Form {...layout} name="basic">
        {moduleAction !== "delete" ? (
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
            <Item label="Contenido" className="editor__admin">
              <div className={formValidation.content}>
                <Editor
                  value={itemToModify.content}
                  init={{
                    height: 400,
                    menubar: true,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                      "codesample",
                    ],
                    codesample_languages: [
                      { text: "HTML/XML", value: "markup" },
                      { text: "JavaScript", value: "javascript" },
                      { text: "CSS", value: "css" },
                      { text: "PHP", value: "php" },
                      { text: "Ruby", value: "ruby" },
                      { text: "Python", value: "python" },
                      { text: "Java", value: "java" },
                      { text: "C", value: "c" },
                      { text: "C#", value: "csharp" },
                      { text: "C++", value: "cpp" },
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help | \
                    codesample",
                  }}
                  onEditorChange={(e) => this.onChangeProperty(e, "content")}
                  onBlur={(e) => {
                    this.setValidationFormOnWriting(
                      e.target.getContent(),
                      "content"
                    );
                  }}
                />
              </div>
            </Item>
            <Item label="Módulo">
              <div>
                <Input defaultValue={itemToModify.moduleTitle} disabled />
              </div>
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
              {moduleAction === "add" ? (
                <SpinButtonAddEdit
                  isHidden={isHidden}
                  textButton="Agregar"
                  itemToModify={itemToModify}
                  editDeleteOrAdd="addForm"
                  triggerLessonAction={triggerLessonAction}
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
                  triggerLessonAction={triggerLessonAction}
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
                ¿ Está seguro que desea eliminar al tema {itemToModify.title}?
                Esta acción también implica eliminar las preguntas de los temas.
              </label>
            </Item>
            <Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <SpinButtonAddEdit
                isHidden={isHidden}
                textButton="Eliminar"
                itemToModify={itemToModify}
                editDeleteOrAdd="deleteForm"
                triggerLessonAction={triggerLessonAction}
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
  triggerLessonAction,
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
          handleSubmitForm(triggerLessonAction, itemToModify, editDeleteOrAdd)
        }
      >
        {textButton}
      </Button>
    );
  }
}
export default AddLesson;
