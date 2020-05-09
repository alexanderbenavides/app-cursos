import React from "react";
import { Switch, Popover } from "antd";
import {
  MoreOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
class TutorialList extends React.Component {
  render() {
    const { tutorialListData } = this.props;
    const dinamic = "/uploads/tutorials";
    const baseUrl = window.$baseUrl;
    const baseImgUrl = `${baseUrl}${dinamic}`;
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
          {tutorialListData.map((item, i) => {
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
                  <div className="text__responsive-img">
                    <img
                      className="avatar-admin"
                      src={`${baseImgUrl}/${item.img}`}
                      alt=""
                    ></img>
                    <PlusOutlined
                      className="plus-icon"
                      onClick={() =>
                        this.props.triggerAddTutorialAvatar(true, item)
                      }
                    />
                  </div>
                </div>
                <div className="text__responsive" text-responsive="Desripción">
                  <span>{item.description}</span>
                </div>
                <div className="text__responsive" text-responsive="Duración">
                  <span>-</span>
                </div>
                <div
                  className="active text__responsive"
                  text-responsive="Estado"
                >
                  <span className="status">
                    <Switch
                      value={item}
                      onClick={() =>
                        this.props.triggerTutorialAction(item, item.published)
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
                              this.props.triggerTutorialAction(item, "delete")
                            }
                          />
                          <EditOutlined
                            value={item}
                            onClick={() =>
                              this.props.triggerTutorialAction(item, "update")
                            }
                          />
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

export default TutorialList;
