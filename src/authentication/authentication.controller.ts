import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthenticationGuard } from './local-authentication.guard';
import { RequestWithUser } from './request-with-user.interface';
import { Response } from 'express';
import { JwtAuthenticationGuard } from './jwt-authentication.guard';
import { LogInDto } from './dto/log-in.dto';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService
    ) {}

    @Post('register')
    @ApiResponse({ status: 201, description: 'User registered succesfully'})
    @ApiResponse({ status: 400, description: 'Error occurred while registering a user'})
    async register(@Body() registrationData: RegisterDto) {
        return this.authenticationService.register(registrationData);
    }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('log-in')
    @ApiBody({type: LogInDto})
    @ApiResponse({ status: 200, description: 'User logged in successfully'})
    @ApiResponse({ status: 400, description: 'Error occurred fetching user details'})
    @ApiResponse({ status: 500, description: 'Something went wrong'})
    async login(@Req() request: RequestWithUser, @Res() response: Response) {
        const {user} = request;
        const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
        response.setHeader('Set-Cookie', cookie);
        user.password = undefined;
        // return user;
        return response.send(user);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('log-out')
    @ApiResponse({ status: 200, description: 'User sucessfully logout'})
    async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
        response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogout());
        return response.sendStatus(200);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get()
    @ApiResponse({ status: 200, description: 'User record fetched successfully'})
    autheticate(@Req() request: RequestWithUser) {
        const user = request.user;
        user.password = undefined;
        return user;
    }
}
