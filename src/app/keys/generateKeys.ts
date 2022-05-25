import Elliptic from "elliptic";
const EC = Elliptic.ec;
const ec = new EC("secp256k1");

export interface KeysType {
	publicKey: string;
	privateKey: string;
}

const generateKeys = (): KeysType => {
	const key = ec.genKeyPair();
	const publicKey = key.getPublic("hex");
	const privateKey = key.getPrivate("hex");

	return {
		publicKey: publicKey,
		privateKey: privateKey,
	};
};

export default generateKeys;
