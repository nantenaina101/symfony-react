<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;

class RegisterType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('firstname', TextType::class, [
                        'label' => 'Prénom',
                        'constraints' => new Length([
                        'min' => 2,
                        'max' => 30,
                        'minMessage' => 'Le prénom doit avoir au minimum {{ limit }} caractères',
                        'maxMessage' => 'Le prénom doit avoir au maximum {{ limit }} caractères',
                        ]),
                        'attr' => [
                                'placeholder' => 'Merci de remplir votre prénoms'
                                    ]
                    ])
            ->add('lastname', TextType::class, [
                        'label' => 'Nom',
                        'constraints' => new Length([
                        'min' => 2,
                        'max' => 30,
                        'minMessage' => 'Le nom doit avoir au minimum {{ limit }} caractères',
                        'maxMessage' => 'Le nom doit avoir au maximum {{ limit }} caractères',
                        ]),
                        'attr' => [
                                'placeholder' => 'Merci de remplir votre nom'
                                    ]
                    ])
            ->add('email', EmailType::class, [
                        'label' => 'Email',
                        'constraints' => new Length([
                        'min' => 10,
                        'max' => 30,
                        'minMessage' => 'L\'email doit avoir au minimum {{ limit }} caractères',
                        'maxMessage' => 'L\'email doit avoir au maximum {{ limit }} caractères',
                        ]),
                        'attr' => [
                                'placeholder' => 'Merci de remplir votre email'
                                    ]
                    ])
            ->add('phone', TelType::class, [
                        'label' => 'Téléphone',
                       'constraints' => new Length([
                        'min' => 10,
                        'max' => 30,
                        'minMessage' => 'Le numéro de téléphone doit avoir au minimum {{ limit }} caractères',
                        'maxMessage' => 'Le numéro de téléphone doit avoir au maximum {{ limit }} caractères',
                        ]),
                        'attr' => [
                                'placeholder' => 'Merci de remplir votre numéro de téléphone'
                                    ]
                    ])
            ->add('adresse', TextType::class, [
                        'label' => 'Adresse',
                       'constraints' => new Length([
                        'min' => 5,
                        'max' => 30,
                        'minMessage' => 'L\'adresse doit avoir au minimum {{ limit }} caractères',
                        'maxMessage' => 'L\'adresse doit avoir au maximum {{ limit }} caractères',
                        ]),
                        'attr' => [
                                'placeholder' => 'Merci de remplir votre adresse'
                                    ]
                    ])
            ->add('password', RepeatedType::class, [
                        'type' => PasswordType::class,
                        'invalid_message' => 'Les mots de passe doivent être identiques',
                        'label' => 'Mot de passe',
                        /*'constraints' => new Length([
                        'min' => 8,
                        'max' => 50,
                        'minMessage' => 'Le mot de passe doit avoir au minimum {{ limit }} caractères',
                        'maxMessage' => 'Le mot de passe doit avoir au maximum {{ limit }} caractères',
                        ]),*/
                        'required' => true,
                        'first_options' => ['label' => 'Mot de passe',
                            'attr' => [
                                'placeholder' => 'Merci de remplir votre mot de passe'
                                            ]
                                                ],
                        'second_options' => ['label' => 'Confirmer le mot de passe',
                                'attr' => [
                                            'placeholder' => 'Merci de confirmer votre mot de passe'
                                            ]
                                            ]
                    ])
            ->add('submit', SubmitType::class, [
                        'label' => 'S\'inscrire'
                    ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}