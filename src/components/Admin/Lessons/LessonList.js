import React from "react";
import { Link } from "react-router-dom";
import { Switch, Popover } from "antd";
import {
  MoreOutlined,
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined
} from "@ant-design/icons";
import { getEmbedContent } from "../../../utils/embedContent";

class LessonList extends React.Component {
  render() {
    const { lessonListData } = this.props;
    return (
      <div className="table__grid">
        <div className="table__grid__head">
          <div>
            <span> N° </span>
            <span> Título </span>
          </div>
          <div>Desripción</div>
          <div>Módulo</div>
          <div>Posición</div>
          <div>Estado</div>
          <div>Acción</div>
        </div>
        <div className="table__grid__container">
          {lessonListData.map((item, i) => {
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
                <div className="text__responsive" text-responsive="Desripción">
                  <EmbedContent embed={item.content} />
                </div>
                <div className="text__responsive" text-responsive="Módulo">
                  <span>{item.module.title}</span>
                </div>
                <div className="text__responsive" text-responsive="posición">
                  <span>{item.position}</span>
                </div>
                <div
                  className="active text__responsive"
                  text-responsive="Estado"
                >
                  <span className="status">
                    <Switch
                      value={item}
                      onClick={() =>
                        this.props.triggerLessonAction(item, item.published)
                      }
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
                            onClick={() =>
                              this.props.triggerLessonAction(item, "delete")
                            }
                          />
                          <EditOutlined
                            value={item}
                            onClick={() =>
                              this.props.triggerLessonAction(item, "update")
                            }
                          />
                          <Link to={`/admin/modules/${item._id}`}>
                            <FileAddOutlined />
                          </Link>
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

function EmbedContent({ embed }) {
  const contentToRender = getEmbedContent(embed);
  return (
    <div
      key={contentToRender}
      dangerouslySetInnerHTML={{ __html: contentToRender }}
    />
  );
}
export default LessonList;
