import React from "react";
import { Switch, Popover } from "antd";
import {
  MoreOutlined,
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined
} from "@ant-design/icons";
class CourseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmLoading: false,
      visiblePopover: false,
      courseData: []
    };
  }

  handleStatus = (item, i) => {
    console.log(item);
    let courseData = this.state.courseData;
    courseData[i].published = !item;
    this.setState({
      courseData
    });
  };
  handleRemove = item => {
    console.log("Eliminar", item);
  };
  handleEdit = item => {
    console.log("editar", item);
  };
  handleVisibleChange = visiblePopover => {
    this.setState({ visiblePopover });
  };
  render() {
    this.setState({ courseData: this.props.courseListData });

    return (
      <div className="table__grid">
        <div className="table__grid__head">
          <div>
            <span> N° </span>
            <span> Título </span>
          </div>
          <div>Imagen</div>
          <div>Desripción</div>
          <div>Duración</div>
          <div>Estado</div>
          <div>Acción</div>
        </div>
        <div className="table__grid__container">
          {this.state.courseData.map((item, i) => {
            return (
              <div className="table__grid__body" key={i}>
                <div
                  className="first_tr_body text__responsive"
                  text-responsive="Título"
                >
                  <div className="user__name">
                    <span> {i + 1}. </span>
                    <span> {item.title} </span>
                  </div>
                </div>
                <div className="text__responsive" text-responsive="Imagen">
                  <span>No data</span>
                </div>
                <div className="text__responsive" text-responsive="Desripción">
                  <span>{item.content}</span>
                </div>
                <div className="text__responsive" text-responsive="Duración">
                  <span>
                    {item.duration_value} {item.duration_text}
                  </span>
                </div>
                <div
                  className="active text__responsive"
                  text-responsive="Estado"
                >
                  <span className="status">
                    <Switch
                      value={item}
                      onClick={() => this.handleStatus(item.published, i)}
                      checkedChildren="Publicado"
                      unCheckedChildren="Suspendido"
                      checked={item.published}
                    />
                  </span>
                </div>
                <div
                  className="action text__responsive"
                  text-responsive="Acción"
                >
                  <span className="container__popover">
                    <Popover
                      content={
                        <div className="grid__iconspopover">
                          <DeleteOutlined
                            value={item}
                            onClick={() => this.handleRemove(item)}
                          />
                          <EditOutlined
                            value={item}
                            onClick={() => this.handleEdit(item)}
                          />
                          <FileAddOutlined />
                        </div>
                      }
                      trigger="click"
                    >
                      <MoreOutlined></MoreOutlined>
                    </Popover>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default CourseList;
