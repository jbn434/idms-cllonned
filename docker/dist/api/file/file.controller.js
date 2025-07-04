"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const file_service_1 = require("./file.service");
const swagger_1 = require("@nestjs/swagger");
const file_dto_1 = require("./file.dto");
let FileController = class FileController {
    constructor(service) {
        this.service = service;
    }
    async create(createFileDto) {
        return await this.service.create(createFileDto);
    }
};
exports.FileController = FileController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ description: 'Create file and upload to S3 bucket' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: file_dto_1.CreateFileResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_dto_1.CreateFileRequestDto]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "create", null);
exports.FileController = FileController = __decorate([
    (0, swagger_1.ApiTags)('files'),
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [file_service_1.FileService])
], FileController);
//# sourceMappingURL=file.controller.js.map