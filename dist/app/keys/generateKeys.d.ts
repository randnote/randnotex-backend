export interface KeysType {
    publicKey: string;
    privateKey: string;
}
declare const generateKeys: () => KeysType;
export default generateKeys;
