export interface IUseCase<IRequest> {
  execute(request?: IRequest);
}
