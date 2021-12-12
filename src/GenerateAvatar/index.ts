import html2canvas from 'html2canvas';
import { commonUpload } from '@tms/fs.js';

type PersonnelInfoType = Record<string, any> & {
  /**
   * 人员昵称
   */
  nickName?: string | null;
  /**
   * 人员头像
   */
  fileUrl?: string | null;
}

class GenerateAvatar {
  // 需要生成头像的人员信息
  personnelInfo: PersonnelInfoType[] = [];
  // 接收人员信息列表
  constructor(personnelInfo: PersonnelInfoType[]) {
    this.personnelInfo = personnelInfo.slice(0, 4);
    // 生成Dom节点
    this.renderDom();
  }

  // 用户头像渲染逻辑 
  getAvatarDom = (obj: PersonnelInfoType) => {
    const { nickName, fileUrl } = obj;
    if (fileUrl) {
      return `
        <div class="avatar-box">
          <img src="${fileUrl}" crossOrigin="anonymous" alt="">
        </div>
      `;
    }
    if (nickName) {
      if (new RegExp('[\\u4E00-\\u9FFF]+', 'g').test(nickName)) {
        return `
          <div class="avatar-box">
            <span class="nick-text">${nickName?.slice(-2)}</span>
          </div>
        `;
      }
      return `
        <div class="avatar-box">
          <span class="nick-text">${nickName?.slice(0, 2)}</span>
        </div>
      `;
    }
    return '';
  }

  // 渲染Dom节点
  renderDom = () => {
    const containerDiv = document.createElement('div');
    containerDiv.className = 'generate—avatar--wrapper';
    containerDiv.id = 'generate—avatar--wrapper';
    let imgDomArr = '';
    this.personnelInfo.forEach(item => {
      const imgDom = this.getAvatarDom(item);
      imgDomArr += imgDom;
    })
    containerDiv.innerHTML = imgDomArr;
    document.body.appendChild(containerDiv);
  }

  // 删除Dom节点
  removeDom = () => {
    try {
      const targetDom = document.getElementById('generate—avatar--wrapper');
      if (!targetDom) {
        throw Error('未找到实例DOM节点！');
      }
      document.body.removeChild(targetDom);
    } catch (e) {
      console.log(e);
    }
  }

  // 使用html2canvas进行截图
  screenshot = async () => {
    try {
      const targetDom = document.getElementById('generate—avatar--wrapper');
      if (!targetDom) {
        throw Error('未找到实例DOM节点！');
      }
      const tmpCanvas = await html2canvas(targetDom, {
        useCORS: true, // 是否尝试使用CORS从服务器加载图像
      });
      const tmpImgBase64Str = tmpCanvas.toDataURL("image/png");
      return tmpImgBase64Str;
    } catch (e) {
      console.log(e);
    }
  }

  // 上传到fs
  uploadImg = async () => {
    try {
      const imgBase64Str = await this.screenshot();
      if (!imgBase64Str) {
        throw Error('生成图片失败！');
      }
      const uploadRes = await commonUpload({
        fileList: [imgBase64Str],
        appId: '09',
        repositoryName: 'trialos'
      })
      const { data, success, errors } = uploadRes;
      if (success) {
        // 删除节点
        this.removeDom();
        const fileInfo = data[0] || {};
        return fileInfo.previewUrl;
      }
      if (errors && errors?.length > 0) {
        throw Error(errors?.[0].message)
      }
      throw Error('上传fs出现异常！')

    } catch (e) {
      console.log(e);
    }
  }

}

export default GenerateAvatar;