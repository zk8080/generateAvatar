import React, { useState } from 'react';
import { GenerateAvatar } from 'generate-avatar';

function Demo() {

  const [imgUrl, setImgUrl] = useState<string>('');

  const handleGenerate = async () => {
    const TestAvatar = new GenerateAvatar([
      {
        fileUrl: null,
        nickName: '测试'
      },{
        fileUrl: null,
        nickName: '哈哈哈'
      },{
        fileUrl: null,
        nickName: '呵呵呵😄'
      }
    ])

    const tmpUrl = await TestAvatar.screenshot();
    setImgUrl(tmpUrl || '');
  }

  return (
    <div>
      {
        imgUrl && (
          <img src={imgUrl} alt="" />
        )
      }
      <div>
        <button onClick={handleGenerate}>点击生成头像</button>
      </div>
    </div>
  );
}

export default Demo;