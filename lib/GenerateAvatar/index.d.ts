declare type PersonnelInfoType = Record<string, any> & {
    /**
     * 人员昵称
     */
    nickName?: string | null;
    /**
     * 人员头像
     */
    fileUrl?: string | null;
};
declare class GenerateAvatar {
    personnelInfo: PersonnelInfoType[];
    constructor(personnelInfo: PersonnelInfoType[]);
    getAvatarDom: (obj: PersonnelInfoType) => string;
    renderDom: () => void;
    removeDom: () => void;
    screenshot: () => Promise<string | undefined>;
    uploadImg: () => Promise<string | undefined>;
}
export default GenerateAvatar;
