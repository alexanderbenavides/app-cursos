import React from "react";
import { Form, Input, Button, Select, InputNumber, Switch } from "antd";
const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

class AddCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemToModify: this.props.itemToEdit
    };
  }

  handleAddCourse = () => {
    console.log(this.state.itemToModify);
  };
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
    const { courseAction } = this.props;
    let { itemToModify } = this.state;
    const { TextArea } = Input;
    return (
      <Form {...layout} name="basic">
        {courseAction !== "delete" ? (
          <div>
            <Item label="Título" name="title">
              <div>
                <Input
                  defaultValue={itemToModify.title}
                  onChange={e => this.onChangeProperty(e.target.value, "title")}
                />
              </div>
            </Item>
            <Item label="Descripción">
              <TextArea
                rows="5"
                className="customized__textarea"
                defaultValue={itemToModify.content}
                onChange={e => this.onChangeProperty(e.target.value, "content")}
              />
            </Item>
            <Item label="Duración (Ej: 10)">
              <InputNumber
                min={1}
                max={60}
                defaultValue={itemToModify.duration_value}
                onChange={e => this.onChangeProperty(e, "duration_value")}
              />
            </Item>
            <Item label="Tiempo">
              <Select
                defaultValue={itemToModify.duration_text}
                placeholder="Selecciona una  opción"
                onChange={e => this.onChangeProperty(e, "duration_text")}
              >
                <Option value="minutes">Minutos</Option>
                <Option value="hours">Horas</Option>
                <Option value="days">Días</Option>
                <Option value="weeks">Semanas</Option>
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
              {courseAction === "add" ? (
                <Button
                  type="primary"
                  onClick={() =>
                    this.props.triggerCourseAction(itemToModify, "addForm")
                  }
                >
                  Agregar
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={() =>
                    this.props.triggerCourseAction(itemToModify, "editForm")
                  }
                >
                  Guardar
                </Button>
              )}
            </Item>
          </div>
        ) : (
          <div>
            <Item className="warning__message">
              <label>
                ¿ Está seguro que desea eliminar al curso : {itemToModify.title}{" "}
                ? Esta acción también implica eliminar el contenido.
              </label>
            </Item>
            <Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button
                type="primary"
                danger
                onClick={() =>
                  this.props.triggerCourseAction(itemToModify._id, "deleteForm")
                }
              >
                Eliminar
              </Button>
            </Item>
          </div>
        )}
      </Form>
    );
  }
}

export default AddCourse;
