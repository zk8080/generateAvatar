---
title: 动态生成头像
---

根据传入的用户头像和昵称生成类似微信群组的头像布局图片

## 基本使用

<code src="../src/GenerateAvatar/demo.tsx"></code>

## API

### GenerateAvatar构造函数
#### constructor
```ts
interface PersonnelInfoType = {
  /**
   * 人员昵称
   */
  nickName?: string | null;
  /**
   * 人员头像
   */
  fileUrl?: string | null;
}

const testParams: PersonnelInfoType[] = [
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
  ]

// 构造实例
const TestAvatar = new GenerateAvatar(testParams);
```

### 实例方法

#### screenshot

使用html2canvas截取渲染完成的DOM节点并且生成图片，返回图片url。

```ts
TestAvatar.screenshot().then(res => {
  // 渲染完成的图片url
  console.log(res)
})
```

#### uploadImg

使用html2canvas截取渲染完成的DOM节点生成图片，并且上传到fs，返回图片预览地址previewUrl。

```ts
TestAvatar.uploadImg().then(res => {
  // 上传到fs之后的图片url
  console.log(res)
})
```