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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InspectionQuestion = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const user_entity_1 = require("./user.entity");
let InspectionQuestion = class InspectionQuestion extends base_entity_1.BaseEntity {
};
exports.InspectionQuestion = InspectionQuestion;
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: 'response', nullable: false }),
    __metadata("design:type", Array)
], InspectionQuestion.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'state_id', type: 'bigint', nullable: false }),
    __metadata("design:type", Number)
], InspectionQuestion.prototype, "stateId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], InspectionQuestion.prototype, "createdBy", void 0);
exports.InspectionQuestion = InspectionQuestion = __decorate([
    (0, typeorm_1.Entity)({ name: 'inspection_questions' })
], InspectionQuestion);
//# sourceMappingURL=inspection-question.entity.js.map