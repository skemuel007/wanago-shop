import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import  { recursivelyStripNullValues } from "./recursively-strip-null-values";

export class ExcludeNullInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle()
        .pipe(map(value => recursivelyStripNullValues(value)));
    }

}
