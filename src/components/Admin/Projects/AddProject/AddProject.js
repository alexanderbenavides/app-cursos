import React, { useState, useEffect } from "react";
import { Form, Input, Button, Switch, Spin, notification } from "antd";
import { courseFormValidation } from "../../../../utils/courseFormValidation";

import { Editor } from "@tinymce/tinymce-react";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

function AddProject(props) {
  const { itemToEdit, isHidden, triggerProjectAction, projectAction } = props;
  const [formValidation, setFormValidation] = useState({
    title: "",
    content: "",
    description: "",
  });
  const [itemToModify, setItemToModify] = useState({});

  useEffect(() => {
    setItemToModify(itemToEdit);
  }, []);
  const setValidationFormOnWriting = (item, property) => {
    const { error } = courseFormValidation(item, property);
    setFormValidation((prevState) => ({
      ...prevState,
      [property]: error,
    }));
  };
  const onChangeProperty = (item, property) => {
    setFormValidation((prevState) => ({
      ...prevState,
      [property]: item,
    }));

    setItemToModify((prevState) => ({
      ...prevState,
      [property]: item,
    }));
  };
  const handleSubmitForm = (
    triggerProjectAction,
    itemToModify,
    editDeleteOrAdd
  ) => {
    if (editDeleteOrAdd === "deleteForm") {
      triggerProjectAction(itemToModify, editDeleteOrAdd);
    } else {
      const { inputs, error } = courseFormValidation(itemToModify, "fullForm");
      if (error === false) {
        triggerProjectAction(itemToModify, editDeleteOrAdd);
      } else {
        notification["warning"]({
          message: "Completar los campos correctamente.",
        });

        setFormValidation((prevState) => ({
          ...prevState,
          title: inputs.title,
          content: inputs.content,
          description: inputs.description,
        }));
      }
    }
  };
  const { Item } = Form;
  const { TextArea } = Input;

  return (
    <Form {...layout} name="basic">
      {projectAction !== "delete" ? (
        <div>
          <Item label="Título" name="title">
            <div>
              <Input
                className={formValidation.title}
                value={itemToModify.title}
                onChange={(e) => onChangeProperty(e.target.value, "title")}
                onKeyUp={(e) =>
                  setValidationFormOnWriting(e.target.value, "title")
                }
                onBlur={(e) =>
                  setValidationFormOnWriting(e.target.value, "title")
                }
              />
            </div>
          </Item>
          <Item label="Descripción">
            <TextArea
              rows="5"
              className={`customized-textarea ${formValidation.description}`}
              value={itemToModify.description}
              onChange={(e) => onChangeProperty(e.target.value, "description")}
              onKeyUp={(e) =>
                setValidationFormOnWriting(e.target.value, "description")
              }
              onBlur={(e) =>
                setValidationFormOnWriting(e.target.value, "description")
              }
            />
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
                    "hr",
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
                    codesample | hr",
                }}
                onEditorChange={(e) => onChangeProperty(e, "content")}
                onBlur={(e) => {
                  setValidationFormOnWriting(e.target.getContent(), "content");
                }}
              />
            </div>
          </Item>
          <Item label="Publicado">
            <Switch
              defaultValue={itemToModify}
              checkedChildren="Publicado"
              unCheckedChildren="Suspendido"
              checked={itemToModify.published}
              onClick={(e) => onChangeProperty(e, "published")}
            />
          </Item>
          <Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            {projectAction === "add" ? (
              <SpinButtonAddEdit
                isHidden={isHidden}
                textButton="Agregar"
                itemToModify={itemToModify}
                editDeleteOrAdd="addForm"
                triggerProjectAction={triggerProjectAction}
                buttonType="primary"
                isDanger={false}
                handleSubmitForm={handleSubmitForm}
              ></SpinButtonAddEdit>
            ) : (
              <SpinButtonAddEdit
                isHidden={isHidden}
                textButton="Guardar"
                itemToModify={itemToModify}
                editDeleteOrAdd="editForm"
                triggerProjectAction={triggerProjectAction}
                buttonType="primary"
                isDanger={false}
                handleSubmitForm={handleSubmitForm}
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
              triggerProjectAction={triggerProjectAction}
              buttonType="primary"
              isDanger={true}
              handleSubmitForm={handleSubmitForm}
            ></SpinButtonAddEdit>
          </Item>
        </div>
      )}
    </Form>
  );
}

function SpinButtonAddEdit({
  isHidden,
  textButton,
  itemToModify,
  editDeleteOrAdd,
  triggerProjectAction,
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
          handleSubmitForm(triggerProjectAction, itemToModify, editDeleteOrAdd)
        }
      >
        {textButton}
      </Button>
    );
  }
}
export default AddProject;
