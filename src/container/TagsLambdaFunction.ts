import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { TagsServiceFactory } from '../build/TagsServiceFactory';

export class TagsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("tags", "Search tags function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-tags', 'controller', 'default', '*', '*'));
        this._factories.add(new TagsServiceFactory());
    }
}

export const handler = new TagsLambdaFunction().getHandler();