import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        getAllUsers: jest.fn(),
        createUser: jest.fn(),
        deleteUser: jest.fn() 
    }
    
    const userController = new UserController(mockUserService as UserService);

    it('Deve retornar todos os usuários',() => {
        const mockRequest = {
            body:{}
        } as Request
        const mockResponse = makeMockResponse();
        userController.getAllUsers(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(200);
    });

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    });

    it('Deve retornar uma mensagem de erro quando o Nome não for informado',() => {
        const mockRequest = {
            body: {
                name: '',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name obrigatório' });
    });

    it('Deve retornar uma mensagem de erro quando o Nome não for informado',() => {
        const mockRequest = {
            body: {
                name: 'João',
                email: ''
            }
        } as Request;
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Email obrigatório' });
    });

    it('Deve retornar uma mensagem confirmando que o usuário foi deletado', () => {
        const mockRequest = {
            body: {
                name: "Joana",
                email: "joana@dio.com",
            }
        } as Request;
        const mockResponse = makeMockResponse();
        userController.deleteUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(200);
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado' });
    });

    it('Deve retornar uma mensagem de erro caso o email não seja informado para deletar usuário', () => {
        const mockRequest = {
            body: {
                name: "Joana",
                email: "",
            }
        } as Request;
        const mockResponse = makeMockResponse();
        userController.deleteUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! É preciso informar o email para deletar' });
    })
})
