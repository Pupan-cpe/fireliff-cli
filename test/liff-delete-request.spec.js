import Axios from 'axios';
import { LIFFDeleteRequest } from '../lib/liff-delete-request';

describe('LIFFDeleteRequest', () => {

    describe('when create an instance with options.accessToken', () => {
        let req;
        let accessToken = 'someaccesstoken';

        beforeAll(() => {
            jest.spyOn(Axios, 'create');
            req = new LIFFDeleteRequest({ accessToken });
        });

        it('should have correct endpoint', () => {
            expect(req.endpoint).toEqual('https://api.line.me/liff/v1/apps');
        });

        it('should create axios instance with correct headers for LINE API', () => {
            expect(Axios.create).toHaveBeenCalledWith({
                headers: {
                    'authorization': `Bearer ${accessToken}`,
                    'content-type': 'application/json'
                }
            });
            expect(req.axios).toBeDefined();
        });

        describe('when send liffId', () => {
            let liffId = 'shkf2h39fwef';
            beforeAll(() => {
                jest.spyOn(req.axios, 'delete').mockResolvedValue('any');
                req.send(liffId);
            });
            it('should call to correct endpoint', () => {
                expect(req.axios.delete).toHaveBeenCalledTimes(1);
                expect(req.axios.delete).toHaveBeenCalledWith(`${req.endpoint}/${liffId}`);
            });
            afterAll(() => {
                req.axios.delete.mockRestore();
            });
        });

        afterAll(() => {
            Axios.create.mockRestore();
        });

    });

});
