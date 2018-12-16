import { Storage } from '@google-cloud/storage';

const storage = new Storage({ projectId: 'housekeeper-223422' });

export default storage;
